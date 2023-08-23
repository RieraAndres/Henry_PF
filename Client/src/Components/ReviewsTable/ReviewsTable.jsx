import React from 'react';
import Table from 'react-bootstrap/Table';

function ReviewsTable({ reviews }) {
  const totalPuntuacion = reviews.reduce((sum, review) => sum + parseInt(review.puntuacion), 0);
  const promedioPuntuacion = totalPuntuacion / reviews.length;

  return (
    <div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>ID Review</th>
            <th>userName</th>
            <th>Puntuación</th>
            <th>Comentario</th>
            <th>Fecha Creación</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id}>
              <td>{index + 1}</td>
              <td>{review.id ? review.id : "-"}</td>
              <td>{review.reviewer.userName ? review.reviewer.userName : '-'}</td>
              <td>{review.puntuacion}</td>
              <td>{review.comentario}</td>
              <td>{review.createdAt}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>PUNTUACIÓN PROMEDIO</th>
            <th>{promedioPuntuacion}</th>
          </tr>
        </thead>
      </Table>
    </div>
  );
}

export default ReviewsTable;
