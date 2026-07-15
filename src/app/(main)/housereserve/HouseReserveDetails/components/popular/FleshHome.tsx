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
            <div className="absolute ">
                   <div className=""><FleshHome1/></div>
              <div className="absolute bottom-31 left-47">
                <div className="absolute"><FleshHome2/></div>
                <div className="absolute left-10"><FleshHome3/></div>
              </div>
                 <div className="absolute left-56 -bottom-12"><FleshHome4/></div>
                 <div className='relative left- bottom-6'>
                    <div className='relative left-153.5 top-17'><FleshHome5/></div>
                    <div className='relative left-160 top-15'><FleshHome6/></div>
                 </div>
            </div>
    </div>
  )
}

export default FleshHome
