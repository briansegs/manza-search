import React from 'react'
import { DictionaryEntry } from '../types'

export interface DefinitionContentProps {
  definitions: DictionaryEntry[]
}

const DefinitionContent: React.FC<DefinitionContentProps> = ({ definitions }) => (
  <div className="flex flex-col gap-4">
    {definitions.map(({ word, origin, phonetic, phonetics, meanings }, index) => (
      <div key={index}>
        <div className="mb-1 text-3xl font-bold capitalize">
          {word} <span className="text-sm font-normal">{`# ${index + 1}`}</span>
        </div>

        {origin && (
          <div>
            <span>Origin: </span> <span>{origin}</span>
          </div>
        )}

        {phonetic && (
          <div className="flex items-end gap-2">
            <div className="font-bold">Phonetic:</div>{' '}
            <div className="text-muted-foreground">{phonetic}</div>
          </div>
        )}

        {phonetics && (
          <div className="flex gap-2">
            <div className="font-bold">Phonetics:</div>
            {phonetics.map(({ text }, index) => (
              <div key={index} className="text-muted-foreground">
                {text}
              </div>
            ))}
          </div>
        )}

        {meanings.map(({ partOfSpeech, definitions }, index) => (
          <div key={index} className="mt-1">
            <div>
              <div className="flex items-end gap-2">
                <div className="text-lg font-semibold capitalize text-sky-500">{partOfSpeech}</div>
              </div>

              {definitions.map(({ definition, example, synonyms, antonyms }, index) => (
                <div key={index} className="my-2 ml-2">
                  <div>
                    <span className="font-bold">{`${index + 1}. `}</span>
                    {definition}
                  </div>

                  {example && (
                    <div className="ml-4 mt-1">
                      <span className="font-bold">Ex.</span> {example}
                    </div>
                  )}

                  {synonyms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <div className="ml-4 font-bold">Synonyms:</div>
                      {synonyms.map((synonym, index) => (
                        <div key={index} className="mr-2 capitalize text-amber-600">
                          {synonym}
                        </div>
                      ))}
                    </div>
                  )}

                  {antonyms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <div className="ml-4 font-bold">Antonyms:</div>
                      {antonyms.map((antonym, index) => (
                        <div key={index} className="mr-2 capitalize text-amber-700">
                          {antonym}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default DefinitionContent
