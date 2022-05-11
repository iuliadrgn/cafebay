import styled from "styled-components";
import React from "react";

const ExtrasGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const ExtrasCheckbox = styled.input`
margin-right: 10px;
cursor: pointer;
`
const CheckboxLabel = styled.label`
cursor: pointer;
`

export function Extras(extras, checkExtra){
return (
    <ExtrasGrid>
        {/*{ extras.map((extra, i) => ( */}
            <CheckboxLabel>
                <ExtrasCheckbox
                    type="checkbox"
                    //checked={extra.checked}
                    onClick={() => {
                        //checkExtra(i);
                        console.log("coffee extra")
                     }}
                    />
                    sugar
    </CheckboxLabel>
        {/*))}*/}
</ExtrasGrid>
);
}