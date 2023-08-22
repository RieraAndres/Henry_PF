import Table from 'react-bootstrap/Table';

function DonationsTable({donations}) {

  const totalDonationAmount = donations.reduce((total, donation) => {
    return total + parseFloat(donation.amount);
  }, 0);
  return (
    <div>
      <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID Donacion</th>
                        <th>ID Donante</th>
                        <th>Cantidad donada</th>
                        <th>Beneficiado</th>
                        <th>Descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation, index) => (
                        <tr key={donation.id}>
                          <td>{index + 1}</td>
                          <td>{donation.id}</td>
                          <td>{donation.donante_id}</td>
                          <td>{donation.amount}</td>
                          <td>{donation.receiver}</td>
                          <td>{donation.description}</td>
                        </tr>
                      ))}
                    </tbody>
                    <thead>
                      <tr>
                        <th>TOTAL</th>
                        <th>{totalDonationAmount}</th>
                      </tr>
                    </thead>
                </Table>
    </div>
  );
}

export default DonationsTable;
