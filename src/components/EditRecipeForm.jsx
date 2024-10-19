import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import categoryStore from '../stores/CategoryStore'; 
import { TextField, Button, MenuItem, Select, FormControl, IconButton, InputAdornment } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RemoveCircleOutline } from '@mui/icons-material';
import '../css/AddRecipeForm.css';

const EditRecipeForm = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching recipe detail for id:', id);
        categoryStore.fetchCategories();
        categoryStore.fetchAreas();
        recipeStore.fetchFirebaseRecipeDetail(id);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating recipe:', recipeStore.newRecipe);

        // check if url is valid
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/;
        if (!urlRegex.test(recipeStore.newRecipe.strMealThumb)) {
            alert('Please enter a valid image URL ending with .png, .jpg, .jpeg, .svg, or .gif');
            return;
        }

        // check if all required fields have value
        if (!recipeStore.newRecipe.strMeal || !recipeStore.newRecipe.strCategory || !recipeStore.newRecipe.strArea || recipeStore.newRecipe.ingredients.length === 0) {
            alert('Please fill out all required fields: name, category, area, and at least one ingredient.');
            return;
        }

        const isValidIngredient = (ingredient, measure) => ingredient.trim() !== "" && measure.trim() !== "";

        const invalidIngredients = recipeStore.newRecipe.ingredients.some(({ ingredient, measure }) => 
            !isValidIngredient(ingredient, measure)
        );

        if (invalidIngredients) {
            alert('All ingredients should also have a written measure.');
            return;
        }

        recipeStore.editRecipe(recipeStore.newRecipe);
        navigate(`/category/${recipeStore.newRecipe.strCategory}/recipe/${id}`);
    };

    const handleAddIngredient = () => {
        recipeStore.addIngredient();
    };

    const handleRemoveIngredient = (index) => {
        if (recipeStore.newRecipe.ingredients.length > 1) {
            recipeStore.removeIngredient(index);
        } else {
            alert("Write at least one ingredient.");
        }
    };

    const closeForm = () => {
        navigate(-1);
    };

    const inputStyle = {
        backgroundColor: '#f9f5ef',
        color: '#542221',
        marginBottom: 2,
        width: '100%',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#8B4513',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#8B4513',
        },
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <img className='closeBtn' onClick={closeForm} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO2X0Q6CIBSGD/YgHuCRgOVc+Sq8Rd1Ur2pj1UrR1INIa3ybmzf8+8Z+8AiQyWQyHZji/GAQjxagADpMS2yMELV7J6doUVZa8Pbx4JUi5dYogZd3TlmRhYzE/TtouZQvw1uXSRayAIWToEgNyVB3uQ9TAk+fwYrjbSKYsiaaFNOcn2PKLJHaTGaOlCezVmdIRdfE8kfbKZ1QZkIqjQwMdyZ+iRfJJJGyIzdwqlKzL0c7+u3syfgl9nZhMyk2Q2YzKfYzH1cbMEKEjC6jGCHq0AGtL/UcY2loic0aI2xHSmJDFjIAu9dwHjrku4wVfhYymcz/cQd9aCL/JJjd5AAAAABJRU5ErkJggg==" />
                <h2>Edit recipe</h2>

                <TextField
                    name="name"
                    label="Recipe name"
                    value={recipeStore.newRecipe.strMeal} 
                    onChange={(e) => recipeStore.updateNewRecipe('strMeal', e.target.value)}
                    required
                    variant="outlined"
                    sx={inputStyle}
                    InputLabelProps={{ style: { color: '#542221' }}}
                    inputProps={{ style: { color: '#542221' }}}
                />

                <TextField
                    name="img"
                    label="Recipe image URL"
                    value={recipeStore.newRecipe.strMealThumb || ''}
                    onChange={(e) => recipeStore.updateNewRecipe('strMealThumb', e.target.value)}
                    required
                    variant="outlined"
                    sx={inputStyle}
                    InputLabelProps={{ style: { color: '#542221' }}}
                    inputProps={{ style: { color: '#542221' }}}
                />

                <div className="select-elements">
                    <FormControl fullWidth variant="outlined">
                        <Select
                            name="category"
                            value={recipeStore.newRecipe.strCategory || ''}
                            onChange={(e) => recipeStore.updateNewRecipe('strCategory', e.target.value)}
                            required
                            displayEmpty
                            sx={{
                                ...inputStyle,
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                              }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                        width: 'auto',
                                    },
                                },
                            }}
                        >
                            <MenuItem value="" disabled>Select category</MenuItem>
                            {categoryStore.categories.map((category) => (
                                <MenuItem key={category.strCategory} value={category.strCategory}>
                                    {category.strCategory}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <Select
                            name="area"
                            value={recipeStore.newRecipe.strArea || ''}
                            onChange={(e) => recipeStore.updateNewRecipe('strArea', e.target.value)}
                            required
                            displayEmpty
                            sx={{
                                ...inputStyle,
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#542221',
                                },
                              }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                        width: 'auto',
                                    },
                                },
                            }}
                        >
                            <MenuItem value="" disabled>Select area</MenuItem>
                            {categoryStore.areas.map((area) => (
                                <MenuItem key={area.strArea} value={area.strArea}>
                                    {area.strArea}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {recipeStore.newRecipe.ingredients.map((ingredientObj, index) => (
                    <div key={index} className='ingredients-container'>
                        <TextField
                            label={`Ingredient ${index + 1}`}
                            value={ingredientObj.ingredient}
                            onChange={(e) => recipeStore.updateIngredient(index, 'ingredient', e.target.value)}
                            fullWidth
                            sx={inputStyle}
                        />
                        <TextField
                            label={`Measure ${index + 1}`}
                            value={ingredientObj.measure}
                            onChange={(e) => recipeStore.updateIngredient(index, 'measure', e.target.value)}
                            fullWidth
                            sx={inputStyle}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            onClick={() => handleRemoveIngredient(index)} 
                                            aria-label="remove ingredient">
                                            <RemoveCircleOutline />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                ))}

                <div className='plus-btn'>
                    <IconButton onClick={handleAddIngredient} aria-label="add ingredient">
                        <AddIcon />
                    </IconButton>
                </div>
                
                <TextField
                    name="instructions"
                    label="Instructions"
                    value={recipeStore.newRecipe.strInstructions || ''}
                    onChange={(e) => recipeStore.updateNewRecipe('strInstructions', e.target.value)}
                    placeholder='Write instructions:'
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    sx={inputStyle}
                />
                
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#542221', color: '#fff' }}>
                    Update recipe
                </Button>
            </form>
        </div>
    );
});

export default EditRecipeForm;