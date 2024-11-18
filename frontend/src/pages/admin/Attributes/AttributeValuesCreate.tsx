import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Grid, TextField, Typography, Paper, Divider, Button, FormControl, Select, MenuItem } from '@mui/material';
import { useAttribute } from '../../../core/hooks/contexts';

const AttributeValuesCreate: React.FC = () => {
  const { t } = useTranslation();
  const { createAttributeValue, fetchAttributes, attributes, loading } = useAttribute();
  const [attributeId, setAttributeId] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    fetchAttributes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('Attributes:', attributes);
  console.log('Selected Attribute ID:', attributeId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attributeId && value) {
      try {
        await createAttributeValue({ attribute_id: attributeId, value });
        console.log('Attribute value created successfully');
      } catch (error) {
        console.error('Error creating attribute value:', error);
      }
    } else {
      console.error('Both attribute_id and value are required');
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h4">{t('createAttributeValue')}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                {t('create')}
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <Select
                  value={attributeId}
                  onChange={(e) => setAttributeId(Number(e.target.value))}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>
                    {t('selectAttribute')}
                  </MenuItem>
                  {attributes.map((attribute) => (
                    <MenuItem key={attribute.id} value={attribute.id}>
                      {attribute.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label={t('value')}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AttributeValuesCreate;

