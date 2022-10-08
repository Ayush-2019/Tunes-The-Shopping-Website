import * as Yup from 'yup'

export const formValidation = {
        model:'',
        brand:'',
        frets:'',
        woodtype:'',
        description:'',
        price:'',
        available:'',
        shipping:false,
        images:[]
}

export const getValues = (data) => {
    return{
        model:data.model,
        brand:data.brand._id,
        frets:data.frets,
        woodtype:data.woodtype,
        description:data.description,
        price:data.price,
        available:data.available,
        shipping:data.shipping,
        images:data.images
        
    }
}

export const validation = () => (
    Yup.object({
        model:Yup.string()
        .required('Model required'),
        brand:Yup.string()
        .required('Brand is required'),
        frets:Yup.number()
        .required('Frets required')
        .oneOf([20,21,22,24], 'Only 20 21 22 24 allowed'),
        woodtype:Yup.string()
        .required('WoodType is required'),
        description:Yup.string()
        .required('Description is required'),
        price:Yup.number()
        .required('Price is required')
        .min(1,'Min is 1')
        .max(50000, 'Max is 50000'),
        available:Yup.number()
        .required('This field is required'),
        shipping:Yup.boolean()
        .required('This field is required')
    })
)