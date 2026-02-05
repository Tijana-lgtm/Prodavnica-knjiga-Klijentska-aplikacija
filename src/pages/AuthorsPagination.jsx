import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAuthorsPage } from "../services/authorsService";
import TablePaginationActions from "../components/TablePaginationActions";

const AuthorsPagination = () => {
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    
    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await fetchAuthorsPage(page + 1);
                setAuthors(data.items);
                setTotalItems(data.count);
                setHasNextPage(data.hasNextPage);
                setHasPreviousPage(data.hasPreviousPage);
            } catch (err) {
                console.error(err.message);
            }
        };
    
        loadAuthors();
    }, [page]);

    const renderAuthors = () => {
        return authors.map((author) => (
            <TableRow hover key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.fullName}</TableCell>
              <TableCell>{author.biography}</TableCell>
              <TableCell>{new Date(author.dateOfBirth).toLocaleDateString()}</TableCell>
            </TableRow>
        ))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper} sx={{ minWidth: 500 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Biography</TableCell>
                        <TableCell>Date of Birth</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderAuthors()}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={4}
                            count={totalItems}
                            rowsPerPage={5}
                            page={page}
                            rowsPerPageOptions={[]}
                            onRowsPerPageChange={() => {}} 
                            onPageChange={handleChangePage}
                            ActionsComponent={(subprops) => (
                                <TablePaginationActions
                                  {...subprops}
                                  hasNextPage={hasNextPage}
                                  hasPreviousPage={hasPreviousPage}
                                />
                            )}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default AuthorsPagination;