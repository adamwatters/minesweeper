import React from "react";

const BoardView = ({ board, handleSpaceClick, gameOver }) => {
  return (
    <div
      style={{ display: "flex", margin: "50px auto", justifyContent: "center" }}
    >
      <div style={{ backgroundColor: gameOver ? "red" : "beige" }}>
        {board.map((row, y) => {
          return (
            <div
              key={y}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "row"
              }}
            >
              {row.map((space, x) => {
                const { open, contents } = space;
                return (
                  <div
                    key={`${x}-${y}`}
                    onClick={() => {
                      handleSpaceClick(x, y);
                    }}
                    style={{
                      cursor: "pointer",
                      width: 35,
                      height: 35,
                      margin: 2,
                      fontSize: 12,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: open
                        ? "rgba(239,224,106,1)"
                        : "rgba(189,232,216,1)"
                    }}
                  >
                    {contents}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { BoardView };
