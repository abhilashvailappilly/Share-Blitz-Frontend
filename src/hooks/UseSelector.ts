import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../Store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector