import Image from "next/image";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/ListingCard";

import getListings from "./actions/getListings";
import { getCurrentUser } from "./actions/getCurrentUser";
import {IListingParams} from './actions/getListings'

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({searchParams}: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState reset />;
  }

  return (
    <Container>
      <div className="pt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {listings.map((list) => (
          <ListingCard key={list.id} data={list} currentUser={currentUser}/>
        ))}
      </div>
    </Container>
  );
}
