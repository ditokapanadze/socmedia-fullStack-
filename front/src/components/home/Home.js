import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination.js";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();

  const dispatch = useDispatch();
  const history = useHistory();
  const page = query.get("page") || 1;

  const searchQuery = query.get("searchQuery");

  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      console.log(tags);
      // მასივს ვერ გადავცემთ პარამეტრა ლინკში, ამიტო თაგები უნდა შევაერთოთ მძიმეებით
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
    // setTags([]);
    // setSearch("");
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  console.log(tags);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={5} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ChipInput
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search tags"
                variant="outlined"
                value={tags}
                style={{ margin: "10px 0" }}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
