import Table from 'react-bootstrap/Table';

function DonationsTable() {
    const donations = [
        {
          id: "a1b2c3d4",
          date: "2023-08-17T12:00:00Z",
          amount: 50.75,
          receiver: "Organización A",
          description: "Donación para ayuda alimentaria",
          donante_id: "u1v2w3x4",
        },
        {
          id: "e5f6g7h8",
          date: "2023-08-18T15:30:00Z",
          amount: 100.0,
          receiver: "Organización B",
          description: "Donación para becas educativas",
          donante_id: "y5z6a7b8",
        },
        {
          id: "i9j0k1l2",
          date: "2023-08-19T10:45:00Z",
          amount: 200.25,
          receiver: "Organización C",
          description: "Donación para proyectos ambientales",
          donante_id: "c9d0e1f2",
        },
        {
          id: "m3n4o5p6",
          date: "2023-08-20T09:15:00Z",
          amount: 75.5,
          receiver: "Organización A",
          description: "Donación para ayuda alimentaria",
          donante_id: "g3h4i5j6",
        },
        {
          id: "q7r8s9t0",
          date: "2023-08-21T14:20:00Z",
          amount: 150.0,
          receiver: "Organización D",
          description: "Donación para investigación médica",
          donante_id: "k7l8m9n0",
        },
      ];

      const totalDonationAmount = donations.reduce((total, donation) => {
        return total + donation.amount;
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
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <th>TOTAL: ${totalDonationAmount}</th>
                        </tr>
                    </thead>
                </Table>
    </div>
  );
}

export default DonationsTable;
