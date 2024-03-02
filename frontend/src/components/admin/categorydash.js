import React, { useState, useEffect } from 'react';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function CategoryDash() {
    // State hooks for managing category, form visibility, selected Category, and image preview
    const [category, setcategory] = useState([]);
    const CategoryArray = Array.isArray(category) ? category : [];

    const [showForm, setShowForm] = useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [nameError, setNameError] = useState('');
    const [ratingError, setRatingError] = useState('');
    // State hooks for new Category and selected Category details
    const [newCategory, setnewCategory] = useState({
        name: '',
    });

    const [selectedCategory, setSelectedCategory] = useState({
        name: '',
    });

 
    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;

        if (showForm) {
            if (name === 'rating') {
                const isValidRating = /^\d*\.?\d{0,1}$/.test(value);
                if (isValidRating && parseFloat(value) >= 1 && parseFloat(value) <= 5) {
                    setRatingError('');
                    setnewCategory((prevCategory) => ({
                        ...prevCategory,
                        [name]: value,
                    }));
                } else {
                    setRatingError('Please enter a valid rating between 1 and 5');
                }
            } else {
                setnewCategory((prevCategory) => ({
                    ...prevCategory,
                    [name]: value,
                }));
            }
        } else {
            setSelectedCategory((prevCategory) => ({
                ...prevCategory,
                [name]: value,
            }));
        }
    };
   
    const validateForm = () => {
        let valid = true;
        if (!newCategory.name.trim()) {
            setNameError('Please enter your name');
            valid = false;
        } else {
            setNameError('');
        }
        return valid;
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        console.log('Adding Category...');

        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', newCategory.name);

            console.log('Form Data:', formData);
            
            const response = await fetch('/api/category',{
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const addedCategory = await response.json();
                setcategory([...category, addedCategory]);
                setShowForm(false);

                // Reset form
                setnewCategory({
                    name: '',
                });
            } else {
                const errorMessage = await response.text(); // Extract the error message
                console.error('Error adding Category:', errorMessage);
            }
        } catch (error) {
            console.error('Error adding Category', error);
        }
    };


    const handleEditCategory = (index) => {
        try {
            const CategoryToEdit = category[index];

            if (!CategoryToEdit) {
                console.error('Invalid Category or image');
                return;
            }

            setSelectedCategory(CategoryToEdit);
            setSelectedCategoryIndex(index);

            setShowForm(true);
        } catch (error) {
            console.error('Error editing Category', error);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        try {
            if (!newCategory) {
                console.error('Selected Category or image is null or undefined');
                return;
            }

            const formData = new FormData();
        
            formData.append('name', newCategory.name)
            
            const response = await fetch(`/api/category/${selectedCategory._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedCategory = await response.json();
                console.log('Updated Category:', updatedCategory);
                const updatedcategory = [...category];
                updatedcategory[selectedCategoryIndex] = updatedCategory;
                setcategory(updatedcategory);
                setShowForm(false);
                setSelectedCategory({
                    _id: updatedCategory._id,
                    name: updatedCategory.name
                });
                // Reset form
                setnewCategory({
                    name: '',
                });
                setSelectedCategoryIndex(null);
            } else {
                console.error('Error updating Category');
            }
        } catch (error) {
            console.error('Error updating Category', error);
        }
    };

    

    // const handleDeleteCategory = async (index) => {
    //     try {
    //         const CategoryId = category[index]._id;
    //         const response = await fetch(`/api/category/${CategoryId}`, {
    //             method: 'DELETE',
    //         });

    //         if (response.ok) {
    //             const updatedcategory = [...category];
    //             updatedcategory.splice(index, 1);
    //             setcategory(updatedcategory);
    //         } else {
    //             console.error('Error deleting Category');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting Category', error);
    //     }
    // };

    const fetchcategory = async () => {
        try {
            const response = await fetch('/api/category');
            if (response.ok) {
                const data = await response.json();
                setcategory(data);
                console.log(setcategory);
            } else {
                console.error('Error fetching category');
            }
        } catch (error) {
            console.error('Error fetching category', error);
        }
    };
    useEffect(() => {
        fetchcategory();
    }, []);

     
    useEffect(() => {
        console.log('Component re-rendered. State:', newCategory);
    }, [newCategory]);

    return (
        <>
            <Header />
            <section className="dash">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-8">
                            <h1>Category Dashboard</h1>

                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add Category'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>{selectedCategoryIndex !== null ? 'Edit' : 'Add'} Category</h2>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={selectedCategoryIndex !== null ? handleUpdateCategory : handleAddCategory} encType='multipart/form-data'>
                                                
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={showForm ? newCategory.name : selectedCategory.name}
                                                        onChange={handleCategoryInputChange}
                                                        className="form-control"
                                                    />
                                                    {nameError && <div className="text-danger">{nameError}</div>}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
                                                    {selectedCategoryIndex !== null ? 'Update' : 'Add'} Category
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {!showForm && (
                                <div>
                                    <h2>Category List</h2>
                                    <table className="table table-dark table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CategoryArray.length > 0 ? (
                                                CategoryArray.map((Category, index) => (
                                                    <tr key={index}>
                                                        <td>{Category.name}</td>
                                                        <td>
                                                            <button onClick={() => handleEditCategory(index)} className="btn btn-primary btn-sm mr-2">Edit</button>
                                                            {/* <button onClick={() => handleDeleteCategory(index)} className="btn btn-danger btn-sm">Delete</button> */}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className='text-center'>No records found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CategoryDash;