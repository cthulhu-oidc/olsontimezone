import { expectType } from "tsd"
import { isOlsonTimezone } from "..";
import isOlsonTimezoneESM from "..";

expectType<boolean>(isOlsonTimezone('bla'));

{
  const value = 'bla'
  if (isOlsonTimezone(value)) {
    expectType<never>(value)
  }
}

{
  const value = 'Europe/Berlin'
  if (isOlsonTimezone(value)) {
    expectType<'Europe/Berlin'>(value)
  }
}
{
  const value = 'bla'
  if (isOlsonTimezoneESM(value)) {
    expectType<never>(value)
  }
}

expectType<boolean>(isOlsonTimezoneESM('bla'));

{
  const value = 'Europe/Berlin'
  if (isOlsonTimezoneESM(value)) {
    expectType<'Europe/Berlin'>(value)
  }
}