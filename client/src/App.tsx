import "./App.css";
import styled from "styled-components";
import Filter from "./_components/Filter";
import { DataProvider } from "./providers/DataProvider";
import CardContainer from "./_components/CardContainer";
import { FilterProvider } from "./providers/FilterProvider";
import { ReqUrlProvider } from "./providers/ReqUrlProvider";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function App() {
  return (
    <DataProvider>
      <FilterProvider>
        <ReqUrlProvider>
          <Container>
            <Filter />
            <CardContainer />
          </Container>
        </ReqUrlProvider>
      </FilterProvider>
    </DataProvider>
  );
}

export default App;
