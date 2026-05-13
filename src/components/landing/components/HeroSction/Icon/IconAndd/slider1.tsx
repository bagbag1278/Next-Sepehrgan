import Image from 'next/image';

export default function MyComponent() {
  return (
    <div>
      {"/public/ho"}
      <Image 
        src="/home.png" 
        alt="آیکون خانه" 
        width={100} 
        height={100} 
      />
    </div>
  );
}