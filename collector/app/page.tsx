'use client'

import Image from 'next/image'
import styles from './page.module.css'
import MultiLineTextField from '@/components/TextField/MultiLineTextField'
import Grid from '@mui/material/Grid'
import TextField from '@/components/TextField/TextField'
import MobileDatePicker from '@/components/DatePicker/MobileDatePicker'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { METHODS } from '@/types/enums'

export default function Home() {
  const [instruction, setInstruction] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [srcUrl, setSrcUrl] = useState<string>("")
  const [srcRefName, setSrcRefName] = useState<string>("")
  const [contentDate, setContentDate] = useState<number>(0)

  const onChangeInstruction = (v:string) => setInstruction(v);
  const onChangeInput = (v:string) => setInput(v);
  const onChangeOutput = (v:string) => setOutput(v);
  const onChangeSourceURL = (v:string) => setSrcUrl(v);
  const onChangeSourceRefName = (v:string) => setSrcRefName(v);
  const onChangeContentDate = (v:number) => setContentDate(v);

  const onClear = () => {
    setInstruction("")
    setInput("")
    setOutput("")
    setSrcUrl("")
    setSrcRefName("")
    setContentDate(0)
  }

  const url = '/api/dataset'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const fetcher = async (url: string, args: RequestArgs) => await fetch(url, {
    method: args.method, headers, body: JSON.stringify(args.payload)
  }).then(res => res.json())

  const AddData = async (payload: DatasetPayload) => {
    const response = await fetcher(url, { method:METHODS.POST, payload })
    console.log('Fetch result :', { response })
  }

  const UpdateData = async (id: string, payload: DatasetPayload) => {
    const response = await fetcher(url, { method:METHODS.PATCH, payload:{ id, ...payload } })
    console.log('Fetch result :', { response })
  }

  const DeleteData = async (id: string) => {
    const response = await fetcher(url, { method:METHODS.DELETE, payload:{ id } })
    console.log('Fetch result :', { response })
  }

  const GetData = async (id: string) => {
    const response = await fetcher(url, { method:METHODS.GET, payload:{ id } })
    console.log('Fetch result :', { response })
  }

  const onSave = () => {
    const data: DatasetPayload = {
      instruction,
      input,
      output,
      link: srcUrl,
      ref: srcRefName,
      created_at: contentDate
    }
    console.log('Request data:', data)
    AddData(data)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Data collector with &nbsp;
          <code className={styles.code}>custom dataset</code>
        </p>
        <div>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a> */}
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MultiLineTextField 
            label={'Instruction'} rows={5} 
            onChange={onChangeInstruction} 
            value={instruction} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MultiLineTextField 
            label={'Input'} rows={5} 
            onChange={onChangeInput} 
            value={input} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MultiLineTextField 
            label={'Output'} rows={5} 
            onChange={onChangeOutput} 
            value={output} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField 
            label={'Link'} 
            onChange={onChangeSourceURL} 
            value={srcUrl} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField 
            label={'Reference'} 
            onChange={onChangeSourceRefName} 
            value={srcRefName} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MobileDatePicker 
            onChange={onChangeContentDate} 
            value={contentDate} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" sx={{ width:'100%' }} color='secondary' onClick={onClear}>Clear</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" sx={{ width:'100%' }} onClick={onSave}>Save</Button>
        </Grid>
      </Grid>
    </main>
  )
}
