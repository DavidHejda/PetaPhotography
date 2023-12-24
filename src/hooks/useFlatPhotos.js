const useFlatPhotos = ({ data }) => {
  const getFieldsFromAirtable = (data) => {
    const photos = data.map((record) => record.fields);
    return photos;
  };

  const airtableFields = getFieldsFromAirtable(data);

  const flattenPhotos = airtableFields.map((field) => field.photos).flat();

  console.debug('flattenPhotos: ', flattenPhotos);

  return { flattenPhotos };
};

export default useFlatPhotos;
