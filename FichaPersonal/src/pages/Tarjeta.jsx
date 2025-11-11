import { useMemo, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import { colorOptions, colorDictionary } from '../constants/colors.js';

const emptyForm = {
  nombre: '',
  email: '',
  color: '',
  terminos: false,
};

const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const Tarjeta = () => {
  const toastRef = useRef(null);
  const [formData, setFormData] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => ({
    nombre: formData.nombre.trim() ? '' : 'El nombre es obligatorio.',
    email: formData.email.trim() && emailRegex.test(formData.email.trim())
      ? ''
      : 'Ingrese un email válido.',
    color: formData.color ? '' : 'Seleccioná un color favorito.',
  }), [formData]);

  const canSave = Object.values(errors).every((value) => !value) && formData.terminos;

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const markTouched = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ nombre: true, email: true, color: true, terminos: true });

    if (!canSave) {
      return;
    }

    const result = await Swal.fire({
      title: '¿Guardar los datos? ',
      text: 'Se almacenarán en el navegador.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      focusCancel: true,
    });

    if (result.isConfirmed) {
      persistPerson(formData);
      toastRef.current?.show({
        severity: 'success',
        summary: 'Datos guardados',
        detail: 'La persona se guardó correctamente.',
        life: 3500,
      });
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setTouched({});
  };

  const persistPerson = (data) => {
    const stored = JSON.parse(localStorage.getItem('personas') ?? '[]');
    const newPerson = {
      id: crypto.randomUUID?.() ?? Date.now().toString(),
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      color: data.color,
      colorLabel: colorDictionary[data.color],
      terminos: data.terminos,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('personas', JSON.stringify([...stored, newPerson]));
  };

  const invalidClass = (field) => (touched[field] && errors[field] ? 'p-invalid' : '');

  return (
    <div className="page form-page">
      <Toast ref={toastRef} position="top-center" />
      <Card title="Tarjeta" subTitle="Completá todos los campos" className="form-card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="nombre">Nombre completo *</label>
            <InputText
              id="nombre"
              value={formData.nombre}
              onChange={(e) => updateField('nombre', e.target.value)}
              onBlur={() => markTouched('nombre')}
              className={invalidClass('nombre')}
              placeholder="Ej: Ana Pérez"
            />
            {touched.nombre && errors.nombre && <small className="p-error">{errors.nombre}</small>}
          </div>

          <div className="field">
            <label htmlFor="email">Email *</label>
            <InputText
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              onBlur={() => markTouched('email')}
              className={invalidClass('email')}
              placeholder="Ej: ana@mail.com"
            />
            {touched.email && errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="field">
            <label htmlFor="color">Color favorito *</label>
            <Dropdown
              id="color"
              value={formData.color}
              onChange={(e) => updateField('color', e.value)}
              onBlur={() => markTouched('color')}
              options={colorOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccioná una opción"
              className={invalidClass('color')}
            />
            {touched.color && errors.color && <small className="p-error">{errors.color}</small>}
          </div>

          <div className="field checkbox-field">
            <Checkbox
              inputId="terminos"
              checked={formData.terminos}
              onChange={(e) => {
                updateField('terminos', e.checked);
                markTouched('terminos');
              }}
            />
            <label htmlFor="terminos">Acepto los términos y condiciones *</label>
          </div>
          {touched.terminos && !formData.terminos && (
            <small className="p-error">Tenés que aceptar los términos para continuar.</small>
          )}

          <div className="buttons">
            <Button
              type="submit"
              label="Guardar"
              icon="pi pi-save"
              disabled={!canSave}
            />
            <Button
              type="button"
              label="Limpiar"
              icon="pi pi-times"
              outlined
              severity="secondary"
              onClick={handleReset}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Tarjeta;
