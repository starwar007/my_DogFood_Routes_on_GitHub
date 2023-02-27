import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { SortContext } from '../../context/sortContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './index.css';

const CardList = ({ cards }) => {
	const navigate = useNavigate();
	const { isLoading } = useContext(UserContext)
	const { selectedTabId } = useContext(SortContext);
	const card__nosort = cards.map((item, index) => <Card key={item._id} {...item} />);
	const card__sort = cards
						.sort((a, b) => {
							switch (selectedTabId) {
								// case "all" :
								// 	break ;
								case "cheap":
									return (a.price - a.discount) - (b.price - b.discount)
								case "low":
									return (b.price - b.discount) - (a.price - a.discount)
								case "sale":
									return b.discount - a.discount
							}
						})
						.map((item, index) => <Card key={item._id} {...item} />);


	return (
		<>
			{!cards.length && !isLoading && <NotFound buttonText='Назад' title="Простите по вашему запросу ничего не найдено" buttonAction={() => navigate(-1)} />}
			<div className='cards'>
				{  
				    selectedTabId ==='all' ? card__nosort : card__sort
				}
			</div>
		</>

	);
};

export default CardList;
