import { SimpleLayout } from '@/components/SimpleLayout'
import Table from '@/components/Table'
import GoogleMap from '../components/GoogleMap'
import AddRestaurantForm from '../components/AddRestaurantForm'

export default function Page() {
  return (
    <SimpleLayout title="Add restaurants" intro="Add restaurants to your list.">
      <div className="">
        <AddRestaurantForm />
      </div>
    </SimpleLayout>
  )
}
