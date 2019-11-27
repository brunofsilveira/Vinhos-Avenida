import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

const DivRow = styled.div`
  padding: 10px;
`

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  height: 200px;
  padding: 10px;
`

const DivInput = styled.div`
  input:focus {
    & + label::after {
      color: #0d47a1;
      border-bottom: 1px solid #0d47a1;
    }
  }
  
  & .prefix.active {
    color: #0d47a1;
  }
`

export default class Detalhes extends Component {

  state = {
    id: 0,
    nome: '',
    origem: '',
    safra: '',
    tipo: '',
    uva: '',
    foto: '',
    alcool: '',
    avaliacao_id: '',
    avaliacao_avaliador: '',
    avaliacao_descricao: '',
    avaliacao_pontuacao: '',
    avaliacoes: [],
    aviso: ''
  }

  componentDidMount() {
    const { match: { params } } = this.props

    const db = firebase.firestore()

    let docRef = db.collection('vinhos').doc(params.id);

    docRef.get().then(doc => {
      if (doc.exists) {
        this.setState({ id: doc.id, ...doc.data() })
      } else {
        console.log('Erro...')
      }
    }).catch(function (error) {
      console.log('Erro de conexão: ', error)
    })

    this.loadAvaliacoes()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const avaliacao = {
      id: this.state.avaliacao_id,
      avaliador: this.state.avaliacao_avaliador,
      descricao: this.state.avaliacao_descricao,
      pontuacao: this.state.avaliacao_pontuacao
    }

    const db = firebase.firestore()

    try {
      db.collection('vinhos').doc(this.state.id)
        .collection('avaliacoes').add(avaliacao)
      this.setState({ aviso: 'Ok! avaliação cadastrada com sucesso' })
    } catch (erro) {
      this.setState({ aviso: 'Erro: ' + erro })
    }
    this.tempoAviso()
  }

  loadAvaliacoes = () => {
    const { match: { params } } = this.props

    let avaliacoes = []

    firebase.firestore().collection('vinhos')
      .doc(params.id)
      .collection('avaliacoes')
      .orderBy('avaliador')
      .onSnapshot(snapshot => {

        snapshot.docChanges().forEach(change => {

          if (change.type === 'added') {
            avaliacoes.push({ id: change.doc.id, ...change.doc.data() })
          }

          if (change.type === 'modified') {
            avaliacoes = avaliacoes.map(vinho => vinho.id === change.doc.id ?
              { id: change.doc.id, ...change.doc.data() }
              : vinho)
          }

          if (change.type === 'removed') {
            avaliacoes = avaliacoes.filter(vinho => vinho.id !== change.doc.id)
          }
        })
        this.setState({ avaliacoes })

      })
  }

  tempoAviso = () => {
    setTimeout(() => {
      this.setState({ aviso: '' })
    }, 5000)
  }

  render() {
    return (
      <div className='container'>

        <div className='row'>

          <div className='col s6'>

            <div className='row'>
              <div className='col s12'>
                <div className='card horizontal'>
                  <div className='card-image'>
                    <Image className='card-img-top' src={`${this.state.foto}`} alt='Tela' />
                  </div>
                  <div className='card-stacked'>
                    <div className='card-content'>
                      <p className='header'><b>{this.state.nome}</b></p>
                      <p>Uva: {this.state.uva}</p>
                      <p>Tipo: {this.state.tipo}</p>
                      <p>Origem: {this.state.origem}</p>
                      <p>Safra: {this.state.safra}</p>
                      <p>Álcool: {this.state.alcool}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>

              {
                this.state.avaliacoes.map(avaliacao => {
                  return <div className='col s12' key={avaliacao.id}>
                    <div className='card'>
                      <div className='card-content'>
                        <div className='row'>
                          <div className='col s10'>
                            <span className='card-title left-align'>{avaliacao.avaliador}</span>
                          </div>
                          <div className='col s2'>
                            <span className='card-title right-align'>{avaliacao.pontuacao}</span>
                          </div>
                        </div>
                        <p>{avaliacao.descricao}</p>
                      </div>
                    </div>
                  </div>
                })
              }

            </div>

          </div>

          <div className='col s6'>
            <DivRow className='card'>
              <form onSubmit={this.handleSubmit}>

                <div className='row'>

                  <DivInput className='input-field col s12'>
                    <i className='material-icons prefix'>account_circle</i>
                    <input
                      id='icon_prefix'
                      type='text'
                      className='validate'
                      name='avaliacao_avaliador'
                      onChange={this.handleChange}
                      value={this.state.avaliacao_avaliador}
                    />
                    <label htmlFor='icon_prefix'>Avaliador</label>
                  </DivInput>

                  <DivInput className='input-field col s12'>
                    <i className='material-icons prefix'>description</i>
                    <input
                      id='icon_telephone'
                      type='text'
                      className='validate'
                      name='avaliacao_descricao'
                      onChange={this.handleChange}
                      value={this.state.avaliacao_descricao}
                    />
                    <label htmlFor='icon_telephone'>Descrição</label>
                  </DivInput>

                  <DivInput className='input-field col s12'>
                    <i className='material-icons prefix'>score</i>
                    <input
                      id='icon_telephone'
                      type='number'
                      className='validate'
                      name='avaliacao_pontuacao'
                      onChange={this.handleChange}
                      value={this.state.avaliacao_pontuacao}
                    />
                    <label htmlFor='icon_telephone'>Pontuação</label>
                  </DivInput>

                </div>

                <DivCenter>
                  <button className='btn waves-effect waves-light  blue darken-4' type='submit' name='action'>
                    Enviar Avaliação
                  <i className='material-icons right'>send</i>
                  </button>
                  &nbsp;&nbsp;
                  <Link to={'/'} className='waves-effect waves-light btn  blue darken-3'>
                    Retornar
                  </Link>
                </DivCenter>

              </form>
            </DivRow>
          </div>

          {this.state.aviso !== '' ?
            <div>
              {this.state.aviso}
            </div>
            : ''
          }

        </div>

      </div>
    )
  }
}
