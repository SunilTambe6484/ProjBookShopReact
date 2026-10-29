/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouteObject } from "react-router-dom";
import IndexCategories from "./categories/IndexCategories";
import IndexAuthors from "./authors/IndexAuthors";
import CreateAuthor from "./authors/CreateAuthor";
import CreateCategory from "./categories/CreateCategory";
import Home from "./home/Home";
import EditCategory from "./categories/EditCategory";
import EditAuthor from "./authors/EditAuthor";
import CreateBookShop from "./bookshops/CreateBookShop";
import EditBookShop from "./bookshops/EditBookShop";
import IndexBookShop from "./bookshops/IndexBookShop";
import CreateBook from "./books/CreateBook";
import EditBook from "./books/EditBook";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./auth/Login";
import BookDetails from "./books/BookDetails";



const routes:RouteObject[]=[
    {path:'/',element:<Home />},
     {path:'BookDetails/:id',element:<BookDetails />},
    {path:'categories',
        element: (
            <ProtectedRoute>
                <IndexCategories />
            </ProtectedRoute>
        ),
        
       },   
    {path:'categories/create',
        element: (
            <ProtectedRoute>
                <CreateCategory />
            </ProtectedRoute>
        ),
        
    },
    {path:'categories/edit-category/:id',
        element: (
            <ProtectedRoute>
                <EditCategory />
            </ProtectedRoute>
        ),
        
    },
    {path:'authors',
        element: (
            <ProtectedRoute>
                <IndexAuthors />
            </ProtectedRoute>
        ),
        
    },
    {path:'authors/create',
        element: (
            <ProtectedRoute>
                <CreateAuthor />
            </ProtectedRoute>
        ),
        
    },
    {path:'authors/edit-author/:id',
        element: (
            <ProtectedRoute>
                <EditAuthor />
            </ProtectedRoute>
        ),
        
    },

    {path:'bookshops',
        element: (
            <ProtectedRoute>
                <IndexBookShop />
            </ProtectedRoute>
        ),
        
    }, 
    {path:'bookshops/create',
        element: (
            <ProtectedRoute>
                <CreateBookShop />
            </ProtectedRoute>
        ),
        
    },
    {path:'bookshops/edit/:id',
        element: (
            <ProtectedRoute>
                <EditBookShop />
            </ProtectedRoute>
        ),
        
    },

    
    {path:'book/create',
        element: (
            <ProtectedRoute>
                <CreateBook />
            </ProtectedRoute>
        ),
        
    },
    {path:'book/edit/:id',
        element: (
            <ProtectedRoute>
                <EditBook />
            </ProtectedRoute>
        ),
        
    },
    {path:'login',element:<Login />},

]

export default routes;