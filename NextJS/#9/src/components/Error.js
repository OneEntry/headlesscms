export default function Error({data}){
    const error = {};
    data.pageData.attributeValues.map((attribute) => {
        const value = Object.values(attribute)[0];
        const key = Object.keys(attribute)[0];
        error[key] = value.length > 1 ? value : value[0]
    })

    function Title({text}){
        return <div dangerouslySetInnerHTML={{__html: text?.value}}/>
    }

    return (
        <div className="error">
            <h1>{data.statusCode}</h1>
            <h2>{data.message}</h2>
            <Title text={error.title}/>
        </div>
    )
}