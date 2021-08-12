import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { RoomCode } from ".";
import userEvent from "@testing-library/user-event";

describe("RoomCode component", ()=>{
  test("Should render code prop when load", async () => {
    render(
      <RoomCode code={"123456"} />
    );

    expect(screen.getByText(/123456/i)).toBeInTheDocument();
  });

  test("Should sender code to clipboard when click", async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(
      <RoomCode code={"123456"} />
    );
    
    const button = screen.getByRole("button");
    userEvent.click(button)


    expect(screen.getByText(/123456/i)).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledTimes(1);

  });
})

  //renderizar o codigo
  //ao clicar deve copiar o codigo