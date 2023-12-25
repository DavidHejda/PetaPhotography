const useFlatPhotos = ({ data }) => {
  const getFieldsFromAirtable = (data) => {
    const photos = data.map((record) => record.fields);
    return photos;
  };

  const airtableFields = getFieldsFromAirtable(data);

  console.debug('airtableFields in useFlatPhotos are: ', airtableFields);

  const flattenPhotos = airtableFields
    .map((field) => field.photos)
    .flat()
    .map((photos) => photos.url);

  return { flattenPhotos };
};

export default useFlatPhotos;
