import React from 'react'
import FleshHome1 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome1'
import FleshHome2 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome2'
import FleshHome3 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome3'
import FleshHome4 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome4'
import FleshHome5 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome5'
import FleshHome6 from '../../../../../../components/HouseDetails/icon/felsh/FleshHome6'

const FleshHome = () => {
  return (
    <div>
            <div className="absolute -left-141 -mt-4 z-40 min-[1600px]:hidden opacity-70 max-[1300px]:hidden">
                   <div className="relative -left-10 bottom-1"><FleshHome1/></div>
              <div className="absolute bottom-31 left-47">
                <div className="absolute"><FleshHome2/></div>
                <div className="absolute left-0"><FleshHome3/></div>
              </div>
                 <div className="absolute left-44 -bottom-11"><FleshHome4/></div>
                 <div className='relative right-54 bottom-9'>
                    <div className='relative left-151 top-18'><FleshHome5/></div>
                    <div className='relative left-152 top-15'><FleshHome6/></div>
                 </div>
            </div>
    </div>
  )
}

export default FleshHome
