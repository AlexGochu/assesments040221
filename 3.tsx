// install typescript: npm install -g typescript ( I install it globally)
// to see result shuld enter in folder of script and type in console:  tsc 3.tsx  --lib "es2015, es2016, dom" | node 3.js

interface IState {
  state: string;
  errorCode?: string | null;
}
interface IResult {
  title: string;
  message: string | null;
}

enum StateEnum {
  processing = "processing",
  error = "error",
  success = "success",
}
enum ErrorEnum {
  noStock = "NO_STOCK",
  incorrectDetails = "INCORRECT_DETAILS",
}
enum TitleEnum {
  orderComplete = "Order complete",
  errorPage = "Error page",
}
enum MessageEnum {
  orderComplete = "Order complete",
  noStock = "No stock has been found",
  incorrectDetails = "Incorrect details have been entered",
}

const delay = async (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getProcessingPage = async (states: IState[]): Promise<IResult> => {
  let result: IResult | null = null;

  for (let i = 0; i < states.length; i++) {
    const stateElement: IState = states[i] as IState;
    switch (stateElement.state) {
      case StateEnum.processing:
      case "processing": {
        await delay(2000);
        break;
      }
      case StateEnum.success:
      case "success": {
        result = { title: TitleEnum.orderComplete, message: null };
        break;
      }
      case StateEnum.error:
      case "error": {
        const errorCode: ErrorEnum | null | undefined =
          stateElement.errorCode as ErrorEnum;
        switch (errorCode) {
          case ErrorEnum.noStock: {
            result = {
              title: TitleEnum.errorPage,
              message: MessageEnum.noStock,
            };
            break;
          }
          case ErrorEnum.incorrectDetails: {
            result = {
              title: TitleEnum.errorPage,
              message: MessageEnum.incorrectDetails,
            };
            break;
          }
          default:
            result = { title: TitleEnum.errorPage, message: null };
        }
        break;
      }
    }
    if (result) break;
  }
  return result;
};

const s = [{ state: "processing" }, { state: "error" }];
(async () => console.log(await getProcessingPage(s)))();
