import { useForm } from "react-hook-form";

const MyMoviesAddForm = ({ formSubmit }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        reset();
        formSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Movie title" {...register("title", { required: true, maxLength: 80 })} />
            <input type="text" placeholder="Movie director" {...register("director", { required: true, maxLength: 100 })} />
            <button type="submit">Add movie</button>
        </form>
    )
}

export default MyMoviesAddForm;