type Props = {
    text: string;
    onClick: () => void;
}
export function Box(props: Props){
    return(
        <div onClick={props.onClick}> 
            {props.text} 
        </div>
    )
}