import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Typography, Paper, Divider, Button, FormControl, Select, MenuItem } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useAttribute } from '../../../core/hooks/contexts';
import { AttributeValue } from '../../../core/hooks/dataTypes';

const AttributeValuesEdit: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { fetchAttributes, attributes, fetchAttributeValue, updateAttributeValue } = useAttribute();
  const navigate = useNavigate();
  const [attributeValue, setAttributeValue] = useState<Pick<AttributeValue, 'attribute_id' | 'value'>>({
    attribute_id: 0,
    value: '',
  });

  useEffect(() => {
    fetchAttributes();
    if (id) {
      fetchAttributeValue(Number(id)).then((data) => {
        setAttributeValue({ attribute_id: data.attribute_id, value: data.value });
      });
    }
  }, [id]);

  const handleAttributeValueChange = (field: keyof typeof attributeValue, value: string | number) => {
    setAttributeValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAttributeValue(Number(id), attributeValue);
      console.log('Attribute value updated successfully');
      navigate('/admin/attributes/values');
    } catch (error) {
      console.error('Error updating attribute value:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h4">{t('editAttributeValue')}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                {t('saveChanges')}
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <Select
                  value={attributeValue.attribute_id}
                  onChange={(e) => handleAttributeValueChange('attribute_id', Number(e.target.value))}
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
                value={attributeValue.value}
                onChange={(e) => handleAttributeValueChange('value', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AttributeValuesEdit;
