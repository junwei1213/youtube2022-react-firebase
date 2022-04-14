const currencyFormatter = (params) => {
  return 'RM ' + params.value;
};

export const userColumns = [
  { field: "id", headerName: "ID", width: 140 },
  {
    field: "productname",
    headerName: "Product Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueFormatter: currencyFormatter,
  },

  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },

  {
    field: "description",
    headerName: "Description",
    width: 300,
  },

  {
    field: "stock",
    headerName: "Stock",
    width: 90,
  },
];
