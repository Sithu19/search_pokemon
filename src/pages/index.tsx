import react, { useEffect } from "react"
import axios from 'axios';
import { useQuery, useMutation, gql } from "@apollo/client";

const api ="https://graphql-pokemon2.vercel.app"

const FETCH_DATA = gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

const Index =() => {
    const { data } = useQuery(FETCH_DATA, { variables: { first: 10 } });
    useEffect(() => {

      console.log(data)
    },[data])



  return (
    <div>
      {data? (
        <div>
        {data.pokemons.map((da: any, i: BigInteger) => (
          <a key={da.id} href={`/${da.id}`} className="main_box_text" style={{textDecoration: "none"}}>
          <div className="main_box" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100px", marginBottom: "20px"}}>
            <div className="sec_box" style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "50%", border: "1px solid", height: "100%"}}>
          <div>

{i+1}
          </div>
          <div><img src={da.image} style={{width: "100px", height: "90px"}} /></div>
          <div>{da.name}</div>
        </div>
            </div>
          </a>
      ))}
      </div>
      ) : null}
    </div>
  )
}

export default Index