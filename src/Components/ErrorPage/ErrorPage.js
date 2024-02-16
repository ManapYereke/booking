import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-100 align-text-center'>
        <h1>Ошибка 404</h1>
        <p>Кажется что-то пошло не так. Страница которую вы запрашиваете не существует</p>
        <Link to="/" className='btn btn-primary'>Перейти на главную</Link>
    </div>
  )
}
