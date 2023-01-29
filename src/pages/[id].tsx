import react, {useEffect} from "react"
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router'

const FETCH_Attack = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    name
    attacks{
      fast{
        name
        type
        damage
      }
      special{
        name
        type
        damage
      }
    }
  }
}`;
const FETCH_Evolution = gql `
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    name
    evolutions{
      id
      number
      name
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      evolutions{
        ...RecursivePokemonFragment
      }
      maxHP
      image
    }
  }
}
`;
const FETCH_DATA = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
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


const Pokemon = () => {
  const router = useRouter()
  const { id } = router.query

  console.log(id)
    const Attack = useQuery(FETCH_Attack, { variables: { id: id } });
    const Evolution = useQuery(FETCH_Evolution, { variables: { id: id } });
    const { data } = useQuery(FETCH_DATA, { variables: { id: id } });
    useEffect(() => {

      console.log(data)
      // console.log(Attack.data.pokemon.attacks.fast)
      console.log(Evolution)
    },[data, Attack, Evolution])
    return (
        <div>

          <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
            <img src={data && data.pokemon.image} style={{width: "200px"}} />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div className="description">
          Name - {data && data.pokemon.name}
          </div>
          <div className="description">
            Maximum height {data && data.pokemon.height.minimum} - Minimum height {data && data.pokemon.height.maximum}
          </div>
          <div className="description">
            Maximum Cp - {data && data.pokemon.maxCP}
          </div>
          <div className="description">
            Maximum Hp - {data && data.pokemon.maxHP}
          </div>
          <div className="description">
            Maximum weight - {data && data.pokemon.weight.maximum} - Minimum weight {data && data.pokemon.weight.minimum}
          </div>
          <div className="divider" />
          <div className="description_sec" >
            <div className="title">

            Resistant
            </div>
            <div style={{marginLeft: "15px"}}>

            {data && data.pokemon.resistant.map((da: any, i: any) => (


              <div key={da}>
               {i+1}. {da}
              </div>
              )
              )}
              </div>
          </div>
          <div className="description_sec">
            <div className="title">
            Type
            </div>
            <div style={{marginLeft: "15px"}}>

            {data && data.pokemon.types.map((da: any, i: any) => (
              <div key={da}>
                {i+1}. {da}
              </div>
              )
              )}
              </div>
          </div>
          <div className="description_sec">
            <div className="title">
            Weakness
            </div>
            <div style={{marginLeft: "15px", marginBottom: "15px"}}>

            {data && data.pokemon.weaknesses.map((da: any, i: any) => (


              <div key={da}>
                {i+1}. {da}
              </div>
              )
              )}
              </div>
          </div>

          <div className="divider" />
          <div className="description_sec">
            <div className="title">
            Fast attacks
            </div>
          <div>
            {Attack.data && Attack.data.pokemon.attacks.fast.map((da: any, i: BigInteger) => (
              <div key={da} style={{marginBottom: "20px"}}>
                <div>
                 Name - {da.name}
                </div>
                <div>
                 Type - {da.type}
                </div>
                <div>
                 Damage - {da.damage}
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="divider" />
          <div className="description_sec">
            <div className="title">
            Special attacks
          </div>
          <div>
            {Attack.data && Attack.data.pokemon.attacks.special.map((da: any, i: BigInteger) => (
              <div key={da} style={{marginBottom: "20px"}}>
                <div>
                   Name - {da.name}
                </div>
                <div>
                  Type - {da.type}
                </div>
                <div>
                  Damage - {da.damage}
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
        </div>
    )
}

export default Pokemon