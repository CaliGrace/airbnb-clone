import React from 'react'
import { Listing, User } from '@prisma/client'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/ListingCard';

interface FavoritesClient {
    currentUser: User | null;
    favorites: Listing[]
}

const FavoritesClient: React.FC<FavoritesClient> = ({currentUser, favorites}) => {
  return (
    <Container>
        <Heading title='Your Favorites' subtitle='Your favorite listings'/>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {
                favorites.map((listing) => (
                    <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
                ))
            }
        </div>
    </Container>
  )
}

export default FavoritesClient