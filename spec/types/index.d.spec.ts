import { expectType } from 'tsd';
import { isOlsonTimezone } from "../../types";

expectType<boolean>(isOlsonTimezone('bla'));