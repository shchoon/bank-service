import "./App.css";
import styled from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Filter from "./_components/Filter/Filter";
import { DataProvider } from "./providers/DataProvider";
import CardContainer from "./_components/Card/CardContainer";
import { FilterProvider } from "./providers/FilterProvider";
import { ReqUrlProvider } from "./providers/ReqUrlProvider";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterProvider>
                    <ReqUrlProvider>
                      <Filter />
                    </ReqUrlProvider>
                  </FilterProvider>
                  <CardContainer />
                </>
              }
            />
          </Routes>
        </Container>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
