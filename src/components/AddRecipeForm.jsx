import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import categoryStore from '../stores/CategoryStore'; 
import { TextField, Button, MenuItem, Select, FormControl, IconButton, InputAdornment } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RemoveCircleOutline } from '@mui/icons-material';
import '../css/AddRecipeForm.css';

const AddRecipeForm = observer(() => {
    const { newRecipe, addIngredient, updateIngredient, removeIngredient, updateNewRecipe, addRecipe } = recipeStore;
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching categories and areas...');
        categoryStore.fetchCategories();
        categoryStore.fetchAreas();
        if (newRecipe.ingredients.length === 0) {
            addIngredient();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting recipe:', recipeStore.newRecipe);
    
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/;
        if (!urlRegex.test(newRecipe.strMealThumb)) {
            console.error('Invalid image URL');
            alert('Please enter a valid image URL ending with .png, .jpg, .jpeg, .svg or .gif');
            return;
        }
    
        if (!newRecipe.strMeal || !newRecipe.strCategory || !newRecipe.strArea || newRecipe.ingredients.length === 0) {
            console.error('All required fields must be filled.');
            alert('Please fill out all required fields: name, category, area, and at least one ingredient.');
            return;
        }
    
        const isValidIngredient = (ingredient, measure) => {
            return ingredient.trim() !== "" && measure.trim() !== "";
        };
        const invalidIngredients = newRecipe.ingredients.some(({ ingredient, measure }) => 
            !isValidIngredient(ingredient, measure)
        );
    
        if (invalidIngredients) {
            alert('All ingredients should also have a written measure.');
            return;
        }
    
        addRecipe();
        closeForm();
    };

    const handleInputChange = (index, field, value) => {
        updateIngredient(index, field, value);
      };
    
      const handleAddIngredient = () => {
        addIngredient();
      };

      const handleRemoveIngredient = (index) => {
        if (newRecipe.ingredients.length > 1) {
            removeIngredient(index);
        } else {
            alert("Write at least one ingredient.");
        }
    };

    const closeForm = () => {
        navigate(-1);
    }

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
      }  

    return (
        <>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                <img className='closeBtn' onClick={closeForm} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO2X0Q6CIBSGD/YgHuCRgOVc+Sq8Rd1Ur2pj1UrR1INIa3ybmzf8+8Z+8AiQyWQyHZji/GAQjxagADpMS2yMELV7J6doUVZa8Pbx4JUi5dYogZd3TlmRhYzE/TtouZQvw1uXSRayAIWToEgNyVB3uQ9TAk+fwYrjbSKYsiaaFNOcn2PKLJHaTGaOlCezVmdIRdfE8kfbKZ1QZkIqjQwMdyZ+iRfJJJGyIzdwqlKzL0c7+u3syfgl9nZhMyk2Q2YzKfYzH1cbMEKEjC6jGCHq0AGtL/UcY2loic0aI2xHSmJDFjIAu9dwHjrku4wVfhYymcz/cQd9aCL/JJjd5AAAAABJRU5ErkJggg==" />
                    <h2>New recipe</h2>
                    <TextField
                        name="name"
                        label="Recipe name"
                        value={newRecipe.strMeal || ''}
                        onChange={(e) => updateNewRecipe('strMeal', e.target.value)}
                        required
                        variant="outlined"
                        sx={inputStyle}
                        InputLabelProps={{
                            style: { color: '#542221' },
                          }}
                          inputProps={{
                            style: { color: '#542221' },
                          }}
                    />
                    
                    <TextField
                        name="img"
                        label="Recipe image URL"
                        value={newRecipe.strMealThumb || ''}
                        onChange={(e) => updateNewRecipe('strMealThumb', e.target.value)}
                        required
                        variant="outlined"
                        sx={inputStyle}
                        InputLabelProps={{
                            style: { color: '#542221' },
                          }}
                          inputProps={{
                            style: { color: '#542221' },
                          }}
                    />

                    <div className="select-elements">
                        <FormControl fullWidth variant="outlined">
                            <Select
                            name="category"
                            value={newRecipe.strCategory}
                            onChange={(e) => updateNewRecipe('strCategory', e.target.value)}
                            displayEmpty
                            required
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                ...inputStyle,
                                '& .MuiOutlinedInput-notchedOutline': {
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
                                value={newRecipe.strArea}
                                onChange={(e) => updateNewRecipe('strArea', e.target.value)}
                                required
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
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
                                    <MenuItem key={area} value={area}>
                                        {area}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {newRecipe.ingredients.map((ingredientObj, index) => (
                        <div key={`ingredient-${index}`} className='ingredients-container'>
                            <TextField
                                label={`Ingredient ${index + 1}`}
                                value={ingredientObj.ingredient}
                                onChange={(e) => handleInputChange(index, 'ingredient', e.target.value)}
                                fullWidth
                                sx={inputStyle}
                                InputLabelProps={{
                                    style: { color: '#542221' },
                                  }}
                                  inputProps={{
                                    style: { color: '#542221' },
                                  }}
                            />
                            <TextField
                                label={`Measure ${index + 1}`}
                                value={ingredientObj.measure}
                                onChange={(e) => handleInputChange(index, 'measure', e.target.value)}
                                fullWidth
                                sx={inputStyle}
                                InputLabelProps={{
                                    style: { color: '#542221' },
                                  }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={() => handleRemoveIngredient(index)} 
                                                color="542221" 
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
                        <IconButton 
                            onClick={handleAddIngredient} 
                            color="#542221" 
                            aria-label="add ingredient">
                            <AddIcon />
                        </IconButton>
                    </div>
                    
                    <TextField
                        name="instructions"
                        label="Instructions"
                        value={newRecipe.strInstructions}
                        onChange={(e) => updateNewRecipe('strInstructions', e.target.value)}
                        placeholder='Write instructions:'
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                        sx={inputStyle}
                        InputLabelProps={{
                            style: { color: '#542221' },
                          }}
                          inputProps={{
                            style: { color: '#542221' },
                          }}
                    />
                    
                    <Button type="submit"
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#542221', 
                        color: '#fff', 
                        }}>
                        Add recipe
                    </Button>
                </form>
            </div>
        </>
    );
});

export default AddRecipeForm;