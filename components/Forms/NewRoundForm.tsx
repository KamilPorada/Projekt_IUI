import { FormEvent } from 'react';
import Link from 'next/link';
import Button from '../UI/Button';
import SectionTitle from '../UI/SectionTitle';
import React, { useState } from 'react';

interface NewRoundFormProps {
  round: RoundData;
  setRound: (note: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, fileContent: string) => Promise<void>;
  submitting: boolean;
  error: string;
}

interface RoundData {
  date: string;
  time: string;
  audioFile: File | null;
}

const NewRoundForm: React.FC<NewRoundFormProps> = ({ round, setRound, handleSubmit, submitting, error }) => {
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!round.audioFile) {
      // Handle the error if the file is not selected
      alert('Please select an audio file.');
      return;
    }

    const fileContent = await readFileAsBase64(round.audioFile);

    await handleSubmit(e, fileContent);
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <section className='w-full mt-3 flex flex-col items-center text-black'>
      <SectionTitle title='Nowy obchód doktorski' />
      <p className='mt-3 lg:text-lg text-center'>Dodaj nowy obchód doktorski i podaj niezbędne informacje.</p>
      <form onSubmit={handleFormSubmit} className='mt-3 w-full max-w-2xl flex flex-col gap-4'>
        <label className='flex flex-col'>
          <span className='font-semibold text-base lg:text-lg text-secondaryColor'>Data</span>
          <input
            type='date'
            name='date'
            className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
            value={round.date}
            onChange={e => setRound({ ...round, date: e.target.value })}
          />
        </label>
        <label className='flex flex-col'>
          <span className='font-semibold text-base lg:text-lg text-secondaryColor'>Godzina</span>
          <input
            type='time'
            name='time'
            className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
            value={round.time}
            onChange={e => setRound({ ...round, time: e.target.value })}
          />
        </label>
        <label className='flex flex-col'>
          <span className='font-semibold text-base lg:text-lg text-secondaryColor'>Plik audio</span>
          <input
            type='file'
            accept='audio/*'
            name='audioFile'
            onChange={e => setRound({ ...round, audioFile: e.target.files?.[0] || null })}
            className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
          />
        </label>
        <p className='mt-1 text-center font-semibold text-red-500'>{error}</p>
        <div className='flex flex-row justify-center text-white'>
          <Link href='/'>
            <Button>Anuluj</Button>
          </Link>
          <Button disabled={submitting}>{submitting ? 'Analiza pliku audio...' : 'Analizuj plik audio'}</Button>
        </div>
      </form>
    </section>
  );
};

export default NewRoundForm;
