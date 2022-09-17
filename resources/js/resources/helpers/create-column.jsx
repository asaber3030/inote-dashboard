export default function createColumn(field, headerName, renderCell, size = 1) {
  return {
    field: field,
    headerName: headerName,
    flex: size,
    renderCell: renderCell
  }
}
