import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Typography, Paper, Divider, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useAttribute } from '../../../core/hooks/contexts';
import { Attribute } from '../../../core/hooks/dataTypes';

const AttributesEdit: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { updateAttribute, fetchAttributes, attributes } = useAttribute();
  const navigate = useNavigate();
  const [attribute, setAttribute] = useState<Pick<Attribute, 'name' | 'description'>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchAttributes();
  }, []);

  useEffect(() => {
    const attr = attributes.find(attr => attr.id === Number(id));
    if (attr) {
      setAttribute({ name: attr.name, description: attr.description });
    }
  }, [attributes, id]);

  const handleAttributeChange = (field: keyof typeof attribute, value: string) => {
    setAttribute((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAttribute(Number(id), attribute);
      console.log('Attribute updated successfully');
      navigate('/admin/attributes');
    } catch (error) {
      console.error('Error updating attribute:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h4">{t('editAttribute')}</Typography>
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
              <TextField
                fullWidth
                label={t('attributeName')}
                value={attribute.name}
                onChange={(e) => handleAttributeChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label={t('attributeDescription')}
                value={attribute.description}
                onChange={(e) => handleAttributeChange('description', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AttributesEdit;
