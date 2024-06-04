import { Header } from "../../components/Header/Header";
import styles from "./CreateProduct.module.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";

export const CreateProduct = () => {
  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className={styles.CreateProductContainer}>
          <h1>Создать оборудование</h1>
          <p>На этой странице вы создаёте <i>новое</i> оборудование. Если у вас поставка уже существующего вам нужна страница: НАЗВАНИЕ</p>
        </div>
      </PageContainer>
    </div>
  );
};
