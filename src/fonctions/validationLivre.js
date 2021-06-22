// ----- VALIDATION DATA AVEC YUP -----

import * as yup from 'yup'
import { useCallback } from 'react'


export default function validationLivre()
{
    // const date = new Date (dateRecup)
    // return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })




    // -------------------- VALIDATION-------------------- (fonction réutilsée/ à sortir dans une autre fonction)
    const useYupValidationResolver = validationSchema =>
    useCallback(
    async data => {
        try {
        const values = await validationSchema.validate(data, {
            abortEarly: false
        })

        return {
            values,
            errors: {}
        }
        } catch (errors) {
        return {
            values: {},
            errors: errors.inner.reduce(
            (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
                }
            }),
            {}
            )
        }
        }
    },
    [validationSchema]
    )

    //FIXME : variable utilisée
    // eslint-disable-next-line no-unused-vars 
    let validationSchema = yup.object().shape({
        title :
            yup.string('Le titre doit être composé de lettres')
            .required('Vous devez saisir un titre'),
        isbn :
            yup.string('L\'ISBN doit être composé de chiffres')
            .required('Vous devez saisir un numéro ISBN')
            .length (13, 'L\'ISBN doit comporter 13 chiffres')
            .matches(/[0-9]/, 'L\'ISBN ne doit comporter que des chiffres'),
        author :
            yup.string('L\'auteur doit être composé de lettres').required('Vous devez saisir un auteur'),
        publicationDate :
            yup.date('La date de parution doit être une date')
            .required('Vous devez indiquer une date de parution')
            .default(function() { return new Date() }),
        description :
            yup.string('Le résumé doit être composé de lettres')
            .required('Vous devez saisir un résumé du livre'),
    })


    const returnData = useYupValidationResolver(validationSchema)
    
    return returnData
}

