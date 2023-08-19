import os
from typing import List

import fire
from datasets import load_dataset, Dataset
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

def train(
    # model/data params
    base_model: str = os.getenv("BASE_MODEL"),  # the only required argument
    data_path: str = "yahma/alpaca-cleaned",
    output_dir: str = "./lora-alpaca",
    # training hyperparams
    batch_size: int = 128,
    micro_batch_size: int = 4,
    num_epochs: int = 3,
    learning_rate: float = 3e-4,
    cutoff_len: int = 256,
    val_set_size: int = 2000,
    # lora hyperparams
    lora_r: int = 8,
    lora_alpha: int = 16,
    lora_dropout: float = 0.05,
    lora_target_modules: List[str] = [
        "q_proj",
        "v_proj",
    ],
    # llm hyperparams
    train_on_inputs: bool = True,  # if False, masks out inputs in loss
    add_eos_token: bool = False,
    group_by_length: bool = False,  # faster, but produces an odd training loss curve
    # wandb params
    wandb_project: str = "",
    wandb_run_name: str = "",
    wandb_watch: str = "",  # options: false | gradients | all
    wandb_log_model: str = "",  # options: false | true
    resume_from_checkpoint: str = None,  # either training checkpoint or final adapter
    prompt_template_name: str = "alpaca",  # The prompt template to use, will default to alpaca.
):
    if int(os.environ.get("LOCAL_RANK", 0)) == 0:
        print(
            f"Training Alpaca-LoRA model with params:\n"
            f"base_model: {base_model}\n"
            f"data_path: {data_path}\n"
            f"output_dir: {output_dir}\n"
            f"batch_size: {batch_size}\n"
            f"micro_batch_size: {micro_batch_size}\n"
            f"num_epochs: {num_epochs}\n"
            f"learning_rate: {learning_rate}\n"
            f"cutoff_len: {cutoff_len}\n"
            f"val_set_size: {val_set_size}\n"
            f"lora_r: {lora_r}\n"
            f"lora_alpha: {lora_alpha}\n"
            f"lora_dropout: {lora_dropout}\n"
            f"lora_target_modules: {lora_target_modules}\n"
            f"train_on_inputs: {train_on_inputs}\n"
            f"add_eos_token: {add_eos_token}\n"
            f"group_by_length: {group_by_length}\n"
            f"wandb_project: {wandb_project}\n"
            f"wandb_run_name: {wandb_run_name}\n"
            f"wandb_watch: {wandb_watch}\n"
            f"wandb_log_model: {wandb_log_model}\n"
            f"resume_from_checkpoint: {resume_from_checkpoint or False}\n"
            f"prompt template: {prompt_template_name}\n"
        )
    assert (
        base_model
    ), "Please specify a --base_model, e.g. --base_model='huggyllama/llama-7b'"
    if base_model is None:
        return
    
    base_model = os.getenv("BASE_MODEL")
    print(f"Base model: {base_model}")
    
    data = load_dataset(data_path)
    print(data["train"])
    train_val1 = data["train"].train_test_split(
        test_size=val_set_size, shuffle=True, seed=42
    )

    # -------------------------------------------------------------

    postgres_uri = "postgresql://{}:{}@{}?port={}&dbname={}".format(
        os.environ['POSTGRES_DB_USER'],
        os.environ['POSTGRES_DB_PASS'],
        os.environ['POSTGRES_DB_HOST'],
        os.environ['POSTGRES_DB_PORT'],
        os.environ['POSTGRES_DB_NAME'],
    )

    print(f'postgres_uri: {postgres_uri}')

    # align column based on alpaca-lora
    ds = Dataset.from_sql('select output, instruction, input from gpt4;', postgres_uri)
    print(ds)
    train_val2 = ds.train_test_split(
        test_size=val_set_size, shuffle=True, seed=42
    )

    assert (
        train_val1 == train_val2
    ), "Both datasets (from huggingface & postgres) should be equal"

if __name__ == "__main__":
    fire.Fire(train)
