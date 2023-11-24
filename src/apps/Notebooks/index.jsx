import ViewReadme from "./ViewReadme"
import useGetConf from "./components/UseGetConf"

export default function Notebooks() {
    const { conf } = useGetConf()

    console.log(conf)


    return (
        <div>
            <ViewReadme />
            Hola soy Notebooks
        </div>
    )
}