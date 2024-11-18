'use client';

import React from 'react';
import {
  Annual_2022_images,
  Annual_2023_images,
  Annual_2024_images,
  Staf_training_2023,
} from '@/lib/constant';
import { GalleryView } from '@/components/GalleryView';

// Assuming this is your custom component

const GalleryPage = () => {
  return (
    <div>
      <div className="container py-10 sm:py-14">
        <GalleryView
          title="Annual Day 2024"
          images={Annual_2024_images}
          isLast={false}
        />
        <GalleryView
          title="Staff Training 2023"
          images={Staf_training_2023}
          isLast={false}
        />
        <GalleryView
          title="Annual Day 2023"
          images={Annual_2023_images}
          isLast={false}
        />
        <GalleryView
          title="Annual Day 2022"
          images={Annual_2022_images}
          isLast={true}
        />
      </div>
    </div>
  );
};

export default GalleryPage;
