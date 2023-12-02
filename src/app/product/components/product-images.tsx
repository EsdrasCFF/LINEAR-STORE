"use client"

import Image from 'next/image'
import { useState } from 'react';

interface ProductImagesProps {
  name: string;
  imageUrls: string[]
}

export function ProductImages({name, imageUrls}: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  function handleImageClick(imageUrl: string) {
    setCurrentImage(imageUrl)
  }

  return (
    <div className='flex flex-col' >
      {/* IMAGEM PRINCIPAL */}
      <div className='flex h-[380px] w-full items-center justify-center bg-accent'>
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes='100vw'
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
      
      {/* BOTOES COM AS OUTRAS IMAGENS */}
      <div className='grid grid-cols-4 gap-4 mt-4 px-4'>
        {imageUrls.map((imageUrl) => (
          <button 
            key={imageUrl} 
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
              ${imageUrl === currentImage && " border-2 border-solid border-primary"}
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes='100vw'
              className='h-auto max-h-[70%] w-auto max-w-[80%]'
              />
          </button>
        ))}
      </div>
    </div>

  )
}