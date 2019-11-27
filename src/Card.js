import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Image = styled.img`
  height: 200px;
  padding: 10px;
`

const Card = props => (
  <div className='col s4'>
    <div className='card horizontal'>
      <div className='card-image'>
        <Image className='card-img-top' src={`${props.foto}`} alt='Tela' />
      </div>
      <div className='card-stacked'>
        <div className='card-content'>
          <p className='header'><b>{props.nome}</b></p>
          <p>Uva: {props.uva}</p>
          <p>Tipo: {props.tipo}</p>
          <p>Origem: {props.origem}</p>
          <p>Safra: {props.safra}</p>
          <p>Álcool: {props.alcool}%</p>
        </div>
        <div className='card-action'>
          <Link to={`/detalhes/${props.id}`}>Ver Detalhes</Link>
        </div>
      </div>
    </div>
  </div>
)

export default Card