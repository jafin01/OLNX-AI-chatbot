import React, { useLayoutEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../../public/images/landing_page_convergent_lottie.json'

function LottieAnimation() {

    const container = useRef<any>(null)

    useLayoutEffect(() => {
        const anim = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
        })
    
        return () => {
          anim.destroy()
        }
      }, [])

  return (
    <div className='w-[100%]' ref={container}></div>
  )
}

export default LottieAnimation