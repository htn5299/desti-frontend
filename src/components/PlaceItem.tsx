import { Button, Carousel, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Place } from '../utils/types'
import Moment from 'react-moment'
import 'moment-timezone'
interface propsState {
  place?: Place
}

const PlaceItem = ({ place }: propsState) => {
  return (
    <div className=' mt-4 grid  grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8'>
      <div className={'flex flex-col items-center gap-3 lg:col-span-1'}>
        <div className={'h-full w-full lg:h-96'}>
          <Carousel className='rounded-xl'>
            <img
              src='https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'
              alt='imaasdge-1'
              className='h-full w-full object-cover'
            />
            <img
              src='https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
              alt='imasdage-2'
              className='h-full w-full object-cover'
            />
            <img
              src='https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80'
              alt='ima22ge-3'
              className='h-full w-full object-cover'
            />
          </Carousel>
        </div>
        <div className={'flex w-full flex-col gap-2'}>
          <Button variant={'outlined'} color={'blue-gray'} className={'w-full'}>
            <span>Been Here </span>
            <FlagIcon className={'inline h-5 w-5'}></FlagIcon>
          </Button>
          <Button variant={'outlined'} color={'blue-gray'} className={'w-full'}>
            <span>Want to Go </span>
            <HeartIcon className={'inline h-5 w-5'}></HeartIcon>
          </Button>
        </div>
      </div>
      <div className={'col-span-2 flex flex-col gap-4'}>
        <Typography variant={'h2'}>
          <span>{place?.name}</span>
        </Typography>
        <p className={'text-gray-700'}>
          {'Created by '}
          <Link to={`/users/${place?.createdBy?.id}`} className={'font-bold text-gray-900 hover:underline'}>
            {place?.createdBy?.name}
          </Link>
        </p>
        <Moment fromNow>{` ${place?.updatedAt}`}</Moment>
        <p className={'line-clamp-[13]'}>
          {`${place?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur cum distinctio est eum nam nemo
          neque nesciunt nihil qui, quo veritatis? Architecto aspernatur aut dolore eligendi esse fuga in itaque magni
          molestias odio, perferendis quos recusandae sed sequi suscipit voluptate voluptates. At dignissimos distinctio
          dolor doloribus dolorum ea, error est et illum iste magnam minus modi, molestias nobis non odio possimus quam
          quo quos rem sapiente tempore voluptatem? Architecto excepturi id magni nostrum praesentium sint tenetur
          voluptatum. Ab dolores eius fuga iure magnam minima nemo recusandae repudiandae. A aspernatur cumque debitis,
          deserunt dolorum eaque eius eos hic id incidunt inventore, iure laboriosam laborum laudantium maxime minima
          molestias quasi qui quis reiciendis reprehenderit rerum suscipit vel velit voluptatibus. Animi autem, facere
          iste laboriosam magni, minus necessitatibus nostrum obcaecati porro quasi ratione reprehenderit rerum, velit.
          Accusantium consequatur dolor, est, excepturi exercitationem fugiat harum illum laborum laudantium libero
          molestias non quaerat quam sunt, temporibus velit veritatis! Accusamus aspernatur at consequatur, cum
          dignissimos doloremque dolores earum et, exercitationem maxime obcaecati odit quae ratione reprehenderit vero.
          Aliquam delectus earum et exercitationem labore libero numquam obcaecati, quam quisquam recusandae, tempore
          velit voluptatibus. Accusantium adipisci alias animi atque aut, debitis dolore ducimus earum esse est et
          expedita, fuga hic ipsa ipsum iste laudantium minus mollitia natus omnis placeat porro quas quis quod
          reiciendis rem repellendus sit ullam ut vitae! Accusamus alias fugiat magni molestiae, perspiciatis sequi
          unde? Asperiores assumenda at consectetur consequuntur cum debitis deleniti deserunt doloremque dolorum ea
          explicabo hic illum ipsam iste necessitatibus neque nisi non odit omnis perferendis possimus praesentium quasi
          quidem quo recusandae reiciendis rem repellat, rerum saepe sed tempora totam ullam veritatis? Aliquam,
          architecto atque dolor ducimus eius esse et harum hic illum laboriosam necessitatibus nihil nisi nulla numquam
          omnis quae quis quos ratione rem tempora, tempore totam unde velit voluptatem?`}
        </p>
      </div>
    </div>
  )
}
export default PlaceItem
