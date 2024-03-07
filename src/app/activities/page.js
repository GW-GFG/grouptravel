import { UseSelector } from "react-redux"

export default function ActivitiesPage() {
    const currentTrip = useSelector(state.user.value.currentTrip)
    
    return (
        <div> 
            Activities there
        </div>
    )

}